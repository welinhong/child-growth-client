import { ChangeEventHandler, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { getMonthsAfterBirth } from "../src/utils/calculator"
import TotalAnalysis from "../src/components/TotalAnalysis/TotalAnalysis"
import Image from "next/image"

export default function Home() {
  const [birthday, setBirthday] = useState("2022-01-01")
  const [sex, setSex] = useState<"male" | "female">("male")
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
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    id="male"
                    checked={sex === "male"}
                    onChange={handleSexChange}
                  />
                  남자
                </label>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="female"
                    id="female"
                    checked={sex === "female"}
                    onChange={handleSexChange}
                  />
                  여자
                </label>
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
                />
                cm
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
              selectedRangeIndex={analysis.rangeIndex}
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
`
const StyledContainerInner = styled.div`
  min-width: 370px;
  max-width: 800px;
  padding: 30px 20px;
  border: 3px solid orange;
  border-radius: 8px;
  background-color: #fff;
  color: black;

  // 모바일에서는 border와 background-color를 제거한다
  @media (max-width: 780px) {
    border: none;
    background: inherit;
  }
`
const StyledField = styled.div`
  display: flex;
  margin: 30px 0;
`
const StyledLabel = styled.label`
  display: block;
  width: 100px;
`
const StyledValue = styled.div`
  // FIXME: 아래 label 스타일링 따로 적용하기
  label {
    margin-right: 20px;
  }
`
const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  color: black;
`
const StyledCenterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const StyledInput = styled.input`
  border: none;
  border-bottom: 2px solid #000;
  font-size: 20px;
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
