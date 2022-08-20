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
  const normalRank = `${range[selectedRangeIndex - 1]?.percentile ?? 0}~${
    range[selectedRangeIndex]?.percentile
  }% 사이에 속해요!`

  const isHighRank = [lastSection, beforeLastSection].includes(selectedRangeIndex)
  const result = isHighRank ? highRank : normalRank

  return (
    <StyledContainer>
      <h3>{monthAfterBirth}개월 우리아이</h3>
      <StyledResult>{result}</StyledResult>

      <StyledGraph>
        <svg viewBox="0 0 800 320">
          <path
            d="M 50 300 Q 200 300 300 150 Q 400 0 500 150 Q 600 300 750 300 "
            fill="none"
            stroke="darkorange"
            strokeWidth="5px"
          />
        </svg>

        {range.map(({ percentile, height }) => (
          <StyledDivider left={`${percentile}%`} key={percentile}>
            <StyledRangeInfo>{height}cm</StyledRangeInfo>
            <StyledStroke left={`${percentile}%`} />
            <StyledRangeInfo>{percentile}%</StyledRangeInfo>
          </StyledDivider>
        ))}

        <StyledIndicator left={`${range[selectedRangeIndex]?.percentile}`}>🌟</StyledIndicator>
      </StyledGraph>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const StyledResult = styled.h2`
  margin-bottom: 30px;
`
const StyledGraph = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 50px;
`
const StyledDivider = styled.div<{ left: string }>`
  height: 90%;
  position: absolute;
  left: ${({ left }) => left};
  bottom: 10px;
`
const StyledStroke = styled.div<{ left: string }>`
  width: 2px;
  height: 100%;
  background-color: lightgray;
`
const StyledRangeInfo = styled.div`
  margin-left: -35%;
  font-size: 10px;
`
const StyledIndicator = styled.div<{ left: number }>`
  position: absolute;
  left: ${({ left }) => `calc(${left}% + ${left > 10 ? "5px" : 0})`};
  bottom: 50%;
  width: 10px;
  height: 10px;
  font-size: 20px;
`
export default TotalAnalysis
