import { useState, useEffect } from 'react'
import type { Character, AttackResult, AttackType } from '../../stores/event'
import { useEventStore } from '../../stores/event'
import {
  MainScreen,
  RulesScreen,
  CountdownScreen,
  GameScreen,
  ResultScreen,
  ScoreboardScreen
} from './screens/index'
import { GameEndScreen } from './screens/CountdownScreen'

export const EventPage = () => {
  // Zustand store에서 상태와 액션 가져오기
  const {
    currentState,
    score,
    timeLeft,
    countdown,
    nickname,
    phoneNumber,
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
    setPhoneNumber,
    resetGame,
    fetchScores,
    submitScore,

  } = useEventStore()

  // 로컬 상태 (캐릭터 관련)
  const [character, setCharacter] = useState<Character>({ defending: null, hit: null })
  const [lastResult, setLastResult] = useState<AttackResult | null>(null)

  // 초기 데이터 로드
  useEffect(() => {
    fetchScores(1)
  }, [fetchScores])

  // 카운트다운(게임 시간) useEffect
  useEffect(() => {
    if (currentState !== 'game') return
    setTimeLeft(15)
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
  }, [currentState, setTimeLeft, setCurrentState])

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
    setCountdown(3)
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
      punch: { target: 'head' as const, points: 100, name: '죽빵' },
      smash: { target: 'body' as const, points: 120, name: '등짝스매슁' },
      kick: { target: 'butt' as const, points: 150, name: '싸커킥' }
    }

    const attack = attackMap[attackType]
    const isHit = character.defending !== attack.target
    
    if (isHit) {
      setScore(score + attack.points)
      setCharacter(prev => ({ ...prev, hit: attack.target }))
      setLastResult({ type: 'HIT', points: attack.points, attack: attack.name })
      
      setTimeout(() => {
        setCharacter(prev => ({ ...prev, hit: null }))
      }, 300)
    } else {
      setLastResult({ type: 'MISS', attack: attack.name })
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

  // 전화번호 유효성 검사
  const phoneRegex = /^010[0-9]{8}$/
  const isPhoneValid = phoneNumber.trim() === '' || phoneRegex.test(phoneNumber.trim())
  const phoneError =
    phoneNumber.trim() === ''
      ? ''
      : !phoneRegex.test(phoneNumber.trim())
        ? '11자리 번호를 입력하세요.'
        : ''

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value)
  }

  const handleSubmitScore = async () => {
    if (!isNicknameValid || !isPhoneValid) return
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
          phoneNumber={phoneNumber}
          onPhoneNumberChange={handlePhoneNumberChange}
          phoneError={phoneError}
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