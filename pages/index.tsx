import { ChangeEventHandler, useState } from "react"
import styled, { css } from "styled-components"
import axios from "axios"
import { getMonthsAfterBirth } from "../src/utils/calculator"
import TotalAnalysis from "../src/components/TotalAnalysis/TotalAnalysis"
import Image from "next/image"

export default function Home() {
  const [birthday, setBirthday] = useState("2022-01-01")
  const [sex, setSex] = useState<"male" | "female" | "">("")
  const [height, setHeight] = useState("")
  const [isAnalysis, setIsAnalysis] = useState(false)
  const [analysis, setAnalysis] = useState({ range: [], rangeIndex: null })
  const [monthAfterBirth, setMonthAfterBirth] = useState(0)

  const getHeightAnalysis = async (info: {
    monthAfterBirth: number
    height: string
    sex: "female" | "male"
  }) => {
    const baseUrl = "http://3.37.248.174/api"
    const endpoint = `/height/range?monthAfterBirth=${info.monthAfterBirth}&height=${info.height}&sex=${info.sex}`

    const data = await axios.get(`${baseUrl}${endpoint}`)
    return data.data
  }

  const handleClick = async () => {
    if (!birthday || !height || !sex) {
      return alert("모든 항목을 입력해주세요")
    }

    // 개월 수 계산
    const months = getMonthsAfterBirth(birthday)
    setMonthAfterBirth(months)

    // API 호출
    const analysis = await getHeightAnalysis({
      monthAfterBirth: months,
      height,
      sex,
    })

    // 결과 출력
    if (analysis) {
      setIsAnalysis(true)
      setAnalysis(analysis)

      console.log("analysis", analysis)
    }
  }

  const handleGoBack = () => {
    setIsAnalysis(false)
  }

  const handleBirthdayChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setBirthday(e.target.value)
  }

  const handleSexChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSex(e.target.value as "male" | "female")
  }

  const handleHeightChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setHeight(e.target.value)
  }

  return (
    <StyledContainer>
      <StyledContainerInner>
        {!isAnalysis && (
          <>
            <StyledCenterBox>
              <StyledCenteredTitle1>🐥</StyledCenteredTitle1>
              <StyledCenteredTitle>우리 아이 키 잘 크고 있을까요?</StyledCenteredTitle>
            </StyledCenterBox>

            <StyledField>
              <StyledLabel htmlFor="birthday">출생일</StyledLabel>
              <StyledValue>
                <StyledInput
                  type="date"
                  id="birthday"
                  value={birthday}
                  onChange={handleBirthdayChange}
                />
              </StyledValue>
            </StyledField>

            <StyledField>
              <StyledLabel htmlFor="male">성별</StyledLabel>
              <StyledValue>
                <StyledRadioLabel checked={sex === "male"}>
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    id="male"
                    checked={sex === "male"}
                    onChange={handleSexChange}
                  />
                  남자
                </StyledRadioLabel>
                <StyledRadioLabel checked={sex === "female"}>
                  <input
                    type="radio"
                    name="sex"
                    value="female"
                    id="female"
                    checked={sex === "female"}
                    onChange={handleSexChange}
                  />
                  여자
                </StyledRadioLabel>
              </StyledValue>
            </StyledField>

            <StyledField>
              <StyledLabel htmlFor="height">키</StyledLabel>
              <StyledValue>
                <StyledInput
                  type="number"
                  id="height"
                  value={height}
                  placeholder="입력해주세요"
                  onChange={handleHeightChange}
                  padding="45px"
                />
                <StyledUnit>cm</StyledUnit>
              </StyledValue>
            </StyledField>

            <StyledCenterBox>
              <StyledButton onClick={handleClick}>확인하기</StyledButton>
            </StyledCenterBox>
          </>
        )}

        {isAnalysis && (
          <>
            <TotalAnalysis
              range={analysis.range}
              height={height}
              selectedSectionIndex={analysis.rangeIndex}
              monthAfterBirth={monthAfterBirth}
            />

            <StyledCenterBox>
              <StyledButton onClick={handleGoBack}>돌아가기</StyledButton>
            </StyledCenterBox>
          </>
        )}
      </StyledContainerInner>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: lightyellow;
  position: relative;
  @media (max-width: 580px) {
    height: auto;
  }
`
const StyledContainerInner = styled.div`
  width: 100%;
  max-width: 580px;
  padding: 30px 20px;
  border-radius: 8px;
  color: black;

  // 모바일에서는 border와 background-color를 제거한다
  @media (max-width: 580px) {
    border: none;
    background: inherit;
  }
`
const StyledField = styled.div`
  display: flex;
  align-items: center;
  margin: 5vh 0;
`
const StyledLabel = styled.label`
  display: block;
  width: 100px;
`
const StyledValue = styled.div`
  // FIXME: 아래 label 스타일링 따로 적용하기
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
`
const StyledUnit = styled.div`
  position: absolute;
  right: 0;
  padding-right: 15px;
`
const StyledButton = styled.button<{ disabled?: boolean }>`
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-top: 25px;
  color: gray;
  border: 2px solid gray;
  padding: 10px 20px;
  border-radius: 8px;

  &:hover {
    background: #f4f4f4;
    opacity: 0.7;
  }
`
const StyledCenterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const StyledInput = styled.input<{ padding?: string }>`
  border: none;
  width: 100%;
  border-radius: 0;
  border-bottom: 2px solid gray;
  background-color: lightyellow;
  font-size: 20px;
  color: black;

  ${({ padding }) => padding ?? `padding-right: ${padding};`}

  text-align: left;
  &::-webkit-date-and-time-value {
    text-align: left;
  }
  -webkit-appearance: none;
`
const StyledCenteredTitle = styled.h3`
  display: flex;
  justify-content: center;
  color: black;
`
const StyledCenteredTitle1 = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 60px;
  margin: 10px 0;
`
const StyledRadioLabel = styled.label<{ checked: boolean }>`
  border: 2px solid gray;
  border-radius: 8px;
  padding: 5px 12px;

  margin-right: 10px;
  color: gray;
  input {
    display: none;
  }
  ${({ checked }) =>
    checked &&
    css`
      font-weight: bold;
      color: darkorange;
      border-color: darkorange;
    `}
`
