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
  selectedSectionIndex: number
  monthAfterBirth: number
}

const INDICATOR_SIZE = 20
const TotalAnalysis = ({
  range,
  height,
  selectedSectionIndex,
  monthAfterBirth,
}: Props): JSX.Element => {
  // 평균보다 작은 경우, 평균인 경우, 평균보다 큰 경우
  const middleSection = range[Math.floor(range.length / 2)]
  const diff = Number((middleSection.height - Number(height)).toFixed(1))
  const message =
    diff > 0
      ? `또래 평균키 ${middleSection.height}cm 보다\n약 ${diff}cm 작아요!`
      : diff < 0
      ? `또래 평균키 ${middleSection.height}cm 보다\n약 ${diff * -1}cm 크네요!`
      : "딱 또래 평균키네요!"

  let indicatorPosition = null
  if (selectedSectionIndex === 0) {
    // 첫번째 구간
    indicatorPosition = range[0].percentile / 2
  } else if (selectedSectionIndex === range.length) {
    // 마지막 구간
    const lastIndex = range.length - 1
    indicatorPosition = (range[lastIndex].percentile + 100) / 2
  } else {
    const prevRange = range[selectedSectionIndex - 1]
    const nextRange = range[selectedSectionIndex]
    indicatorPosition = (prevRange.percentile + nextRange.percentile) / 2
  }

  return (
    <StyledContainer>
      <StyledTitle>{monthAfterBirth}개월 우리아이</StyledTitle>
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

        <StyledIndicator left={indicatorPosition}>🌟</StyledIndicator>
      </StyledGraph>

      <Reference>출처: 소아청소년성장도표(질병관리청)</Reference>
    </StyledContainer>
  )
}
// TODO: 해당하는 색션 구하는 로직을 TDD로 구현하기

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const StyledTitle = styled.h2``
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
  svg {
    position: relative;
    z-index: 1;
  }
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
  font-size: 13px;
  margin: 5px 0 5px -25%;
`
const StyledIndicator = styled.div<{ left: number }>`
  position: absolute;
  left: ${({ left }) => `calc(${left}% - ${INDICATOR_SIZE / 2}px)`};
  bottom: 50%;
  z-index: 1;
  font-size: ${INDICATOR_SIZE}px;
`
const Reference = styled.div`
  width: 100%;
  font-size: 10px;
  color: #959ca6;
  text-align: right;
`

export default TotalAnalysis
