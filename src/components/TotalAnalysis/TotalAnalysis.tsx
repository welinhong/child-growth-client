import React from "react"
import styled from "styled-components"

export type Range = {
  height: number
  percentile: number
}

export type Props = {
  range: Range[]
  selectedRangeIndex: number
  monthAfterBirth: number
}

const TotalAnalysis = ({ range, selectedRangeIndex, monthAfterBirth }: Props): JSX.Element => {
  // 끝에서 마지막 2구간인 경우 상위 ~에 속해요 출력
  const lastSection = range.length
  const beforeLastSection = range.length - 1

  // 이 외에는 NN~MM구간으로 출력
  const highRank = `상위 ${range[selectedRangeIndex - 1]?.percentile}%이상에 속해요!`
  const normalRank = `${range[selectedRangeIndex - 1]?.percentile}~${
    range[selectedRangeIndex]?.percentile
  }% 사이에 속해요!`

  const isHighRank = [lastSection, beforeLastSection].includes(selectedRangeIndex)
  const result = isHighRank ? highRank : normalRank

  return (
    <StyledContainer>
      <h3>{monthAfterBirth}개월 우리아이</h3>
      <h2>{result}</h2>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export default TotalAnalysis
