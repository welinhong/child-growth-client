import React from "react"
import styled from "styled-components"
import { getRelativePercentile } from "../../utils/calculator"

export type Range = {
  height: number
  percentile: number
}

export type Props = {
  range: Range[]
  height: string
  selectedRangeIndex: number
  monthAfterBirth: number
}

const TotalAnalysis = ({
  range,
  height,
  selectedRangeIndex,
  monthAfterBirth,
}: Props): JSX.Element => {
  console.log("selectedRangeIndex", selectedRangeIndex)

  const selectedSection = range[selectedRangeIndex]
  const prevSection = range[selectedRangeIndex - 1]
  const nextSection = range[selectedRangeIndex + 1]

  // 평균보다 작은 경우, 평균인 경우, 평균보다 큰 경우
  const middleSection = range[Math.floor(range.length / 2)]
  const diff = Number((middleSection.height - Number(height)).toFixed(1))
  const message =
    diff > 0
      ? `또래 평균키 ${middleSection.height}cm 보다\n약 ${diff}cm 작아요!`
      : diff < 0
      ? `또래 평균키 ${middleSection.height}cm 보다\n약 ${diff * -1}cm 크네요!`
      : "딱 또래 평균키네요!"

  return (
    <StyledContainer>
      <h3>{monthAfterBirth}개월 우리아이</h3>
      <StyledMessage>{message}</StyledMessage>

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
            <StyledRangeInfo>{getRelativePercentile(percentile)}%</StyledRangeInfo>
            <StyledStroke left={`${percentile}%`} />
            <StyledRangeInfo>{height}cm</StyledRangeInfo>
          </StyledDivider>
        ))}

        <StyledIndicator left={range[selectedRangeIndex]?.percentile || 0}>🌟</StyledIndicator>
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
const StyledMessage = styled.h2`
  margin-bottom: 30px;
  text-align: center;
  white-space: pre-wrap;
  line-height: 1.5;
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
  font-size: 10px;
  margin: 5px 0 5px -25%;
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
