import React from 'react'
import type { InteractiveCharacterProps } from '../../../../stores/birthday'

const imageMap = {
  default: '/assets/character.png',
  protect: {
    head: '/assets/protect-head.png',
    body: '/assets/protect-body.png',
    butt: '/assets/protect-leg.png',
  },
  hit: {
    head: '/assets/count-head.png',
    body: '/assets/count-body.png',
    butt: '/assets/count-leg.png',
  },
}

export const InteractiveCharacter: React.FC<InteractiveCharacterProps> = ({ character, onAttack }) => {
  // 어떤 상태의 이미지를 보여줄지 결정
  let imgSrc = imageMap.default
  if (character.hit) {
    imgSrc = imageMap.hit[character.hit]
  } else if (character.defending) {
    imgSrc = imageMap.protect[character.defending]
  }

  // 클릭 영역 계산 (머리/몸통/하체)
  // 각 부위별로 투명 div를 겹쳐서 클릭 영역만 다르게 처리
  return (
    <div className="relative w-64 h-96 select-none">
      {/* 캐릭터 이미지 */}
      <img
        src={imgSrc}
        alt="캐릭터"
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        draggable={false}
      />
      {/* 머리 클릭 영역 */}
      <div
        onClick={() => onAttack('punch')}
        className="absolute left-1/2 -translate-x-1/2 top-[15%] w-[38%] h-[30%] cursor-pointer z-10 rounded-full"
        title="머리 클릭 - 펀치 (100점)"
      />
      {/* 몸통 클릭 영역 */}
      <div
        onClick={() => onAttack('smash')}
        className="absolute left-1/2 -translate-x-1/2 top-[45%] w-[45%] h-[20%] cursor-pointer z-10 rounded-lg"
        title="몸통 클릭 - 등짝스매슁 (120점)"
      />
      {/* 하체 클릭 영역 */}
      <div
        onClick={() => onAttack('kick')}
        className="absolute left-1/2 -translate-x-1/2 top-[65%] w-[45%] h-[22%] cursor-pointer z-10 rounded-lg"
        title="하체 클릭 - 싸커킥 (150점)"
      />
      {/* 공격 안내 텍스트 */}
      <div className="text-white text-sm text-center absolute w-full left-0 bottom-0 mt-4 space-y-1 pointer-events-none">
        <p>💡 캐릭터의 각 부위를 클릭하세요!</p>
        <p>머리: 죽빵 | 몸통: 등짝스매슁 | 하체: 싸커킥</p>
      </div>
    </div>
  )
} 