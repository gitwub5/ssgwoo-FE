import { useState, useEffect } from 'react'
import type { Character, AttackResult, AttackType } from '../../../stores/birthday'
import { useBirthdayStore, GAME_CONFIG } from '../../../stores/birthday'
import {
  MainScreen,
  RulesScreen,
  CountdownScreen,
  GameScreen,
  ResultScreen,
  ScoreboardScreen
} from './screens/index'
import { GameEndScreen } from './screens/CountdownScreen'

export const BirthdayGamePage = () => {
  // Zustand store에서 상태와 액션 가져오기
  const {
    currentState,
    score,
    timeLeft,
    countdown,
    nickname,
    scores,
    isLoading,
    error,
    totalPages,
    currentPage,

    setCurrentState,
    setScore,
    setTimeLeft,
    setCountdown,
    setNickname,
    resetGame,
    fetchScores,
    submitScore,
    startGameSession,
    recordAttack,

  } = useBirthdayStore()

  // 로컬 상태 (캐릭터 관련)
  const [character, setCharacter] = useState<Character>({ defending: null, hit: null })
  const [lastResult, setLastResult] = useState<AttackResult | null>(null)

  // 개발자 도구 감지 및 게임 보호
  useEffect(() => {
    const detectDevTools = () => {
      if (currentState === 'game' && (
        window.outerHeight - window.innerHeight > 200 ||
        window.outerWidth - window.innerWidth > 200
      )) {
        // 개발자 도구가 열렸을 때 게임 종료
        setCurrentState('gameend')
        setScore(0) // 점수 무효화
      }
    }

    const interval = setInterval(detectDevTools, 1000)
    return () => clearInterval(interval)
  }, [currentState, setCurrentState, setScore])

  // 키보드 단축키 비활성화
  useEffect(() => {
    const preventShortcuts = (e: KeyboardEvent) => {
      if (currentState === 'game') {
        // F12, Ctrl+Shift+I, Ctrl+U 등 비활성화
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.key === 'U') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C')
        ) {
          e.preventDefault()
          return false
        }
      }
    }

    document.addEventListener('keydown', preventShortcuts)
    return () => document.removeEventListener('keydown', preventShortcuts)
  }, [currentState])

  // 우클릭 메뉴 비활성화
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => {
      if (currentState === 'game') {
        e.preventDefault()
        return false
      }
    }

    document.addEventListener('contextmenu', preventContextMenu)
    return () => document.removeEventListener('contextmenu', preventContextMenu)
  }, [currentState])

  // 초기 데이터 로드
  useEffect(() => {
    fetchScores(1)
  }, [fetchScores])

  // 카운트다운(게임 시간) useEffect
  useEffect(() => {
    if (currentState !== 'game') return
    
    // 게임 시작 시 세션 시작
    startGameSession()
    setTimeLeft(GAME_CONFIG.GAME_DURATION)
    
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer)
          setCurrentState('gameend')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [currentState, setTimeLeft, setCurrentState, startGameSession])

  // 게임 시간 초과 감지 및 0점 처리
  useEffect(() => {
    if (currentState !== 'game') return
    
    const gameStartTime = Date.now()
    
    const timeCheckInterval = setInterval(() => {
      const elapsedTime = Date.now() - gameStartTime
      
      // 모바일 환경 감지
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const maxAllowedTime = isMobile 
        ? GAME_CONFIG.GAME_DURATION_MS + GAME_CONFIG.MOBILE_TOLERANCE_MS
        : GAME_CONFIG.GAME_DURATION_MS
      
      if (elapsedTime > maxAllowedTime) {
        // 설정된 시간 초과 시 즉시 게임 종료 및 0점 처리
        clearInterval(timeCheckInterval)
        setScore(0)
        setCurrentState('gameend')
      }
    }, 100) // 100ms마다 체크하여 정확한 시간 감지
    
    return () => clearInterval(timeCheckInterval)
  }, [currentState, setScore, setCurrentState])

  // 게임 종료 카운트다운 (gameend 상태에서 2초 후 result로)
  useEffect(() => {
    if (currentState !== 'gameend') return
    const timer = setTimeout(() => {
      setCurrentState('result')
    }, 2000)
    return () => clearTimeout(timer)
  }, [currentState, setCurrentState])

  // 방어 애니메이션 useEffect
  useEffect(() => {
    if (currentState !== 'game') return
    setCharacter({ defending: null, hit: null })
    const defenseTimer = setInterval(() => {
      const defenseOptions: (Character['defending'])[] = ['head', 'butt', 'body', null]
      const randomDefense = defenseOptions[Math.floor(Math.random() * defenseOptions.length)]
      setCharacter(prev => ({ ...prev, defending: randomDefense }))
    }, 500)
    return () => clearInterval(defenseTimer)
  }, [currentState])

  // 게임 시작 전 카운트다운
  const startCountdown = () => {
    setCurrentState('countdown')
    setCountdown(GAME_CONFIG.COUNTDOWN_DURATION)
    const startGame = () => {
      resetGame()
      setCharacter({ defending: null, hit: null })
      setLastResult(null)
      setCurrentState('game')
    }
    const countdownInterval = setInterval(() => {
      setCountdown((prev: number) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          startGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const attack = (attackType: AttackType) => {
    const attackMap = {
      punch: { target: 'head' as const, points: 100, penalty: -50, name: '죽빵' },
      smash: { target: 'body' as const, points: 120, penalty: -60, name: '등짝스매슁' },
      kick: { target: 'butt' as const, points: 150, penalty: -75, name: '싸커킥' }
    }

    const attack = attackMap[attackType]
    const isHit = character.defending !== attack.target
    
    // 공격 기록
    recordAttack(isHit)
    
    if (isHit) {
      setScore(score + attack.points)
      setCharacter(prev => ({ ...prev, hit: attack.target }))
      setLastResult({ type: 'HIT', points: attack.points, attack: attack.name })
      
      setTimeout(() => {
        setCharacter(prev => ({ ...prev, hit: null }))
      }, 300)
    } else {
      // 막는 부위를 때리면 페널티 점수
      const penaltyPoints = attack.penalty
      setScore(score + penaltyPoints)
      setCharacter(prev => ({ ...prev, hit: attack.target }))
      setLastResult({ type: 'MISS', points: penaltyPoints, attack: attack.name })
      
      setTimeout(() => {
        setCharacter(prev => ({ ...prev, hit: null }))
      }, 300)
    }

    setTimeout(() => setLastResult(null), 1000)
  }

  // 닉네임 유효성 검사
  const isNicknameValid = nickname.trim().length > 0 && nickname.trim().length <= 10
  const nicknameError =
    nickname.trim().length === 0
      ? '닉네임을 입력하세요.'
      : nickname.trim().length > 10
        ? '닉네임은 최대 10자까지 가능합니다.'
        : ''

  const handleSubmitScore = async () => {
    if (!isNicknameValid) return
    try {
      await submitScore(nickname, score)
      setCurrentState('leaderboard')
    } catch {
      // 실패 시 이동하지 않음, 에러 메시지는 store에서 관리
    }
  }

  const handleShowScoreboard = () => {
    setCurrentState('leaderboard')
  }

  const handleGoToMain = () => {
    setCurrentState('start')
  }

  // 스코어보드 진입 시마다 새로고침
  useEffect(() => {
    if (currentState === 'leaderboard') {
      fetchScores(1)
    }
  }, [currentState, fetchScores])

  // 화면별 렌더링
  switch (currentState) {
    case 'start':
      return (
        <MainScreen 
          onStart={() => setCurrentState('rules')}
          onShowScoreboard={handleShowScoreboard}
        />
      )
    
    case 'rules':
      return <RulesScreen onStartGame={startCountdown} onBackToMain={() => setCurrentState('start')} />
    
    case 'countdown':
      return <CountdownScreen countdown={countdown} />
    
    case 'game':
      return (
        <GameScreen
          timeLeft={timeLeft}
          score={score}
          character={character}
          lastResult={lastResult}
          onAttack={attack}
        />
      )
    
    case 'result':
      return (
        <ResultScreen
          score={score}
          nickname={nickname}
          onNicknameChange={setNickname}
          onSubmitScore={handleSubmitScore}
          onGoToMain={handleGoToMain}
          isNicknameValid={isNicknameValid}
          nicknameError={nicknameError}
          isLoading={isLoading}
          error={error}
        />
      )
    
    case 'leaderboard':
      return (
        <ScoreboardScreen
          scores={scores}
          onGoToMain={handleGoToMain}
          isLoading={isLoading}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={fetchScores}
        />
      )
    
    case 'gameend':
      return <GameEndScreen />
    
    default:
      return null
  }
}