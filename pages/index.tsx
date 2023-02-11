import { ChangeEventHandler, useState } from "react"
import styled, { css } from "styled-components"
import axios from "axios"
import { getMonthsAfterBirth } from "../src/utils/calculator"
import TotalAnalysis from "../src/components/TotalAnalysis/TotalAnalysis"
import Image from "next/image"
import CustomHeader from "../src/components/CustomHeader"
import AdBanner from "../src/components/AdBanner"

const DEFAULT_BIRTHDAY = "2022-01-01"
export default function Home() {
  const [birthday, setBirthday] = useState(DEFAULT_BIRTHDAY)
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
    const baseUrl = "https://www.check-ki.com/api"
    const endpoint = `/height/range?monthAfterBirth=${info.monthAfterBirth}&height=${info.height}&sex=${info.sex}`

    const data = await axios.get(`${baseUrl}${endpoint}`)
    return data.data
  }

  const handleClick = async () => {
    if (!birthday || !height || !sex) {
      return alert("모든 항목을 입력해주세요")
    }

    // 개월 수 계산
    try {
      const months = getMonthsAfterBirth(birthday)
      if (months > 227) {
        return alert("만 18세 이하만 확인할 수 있습니다.")
      }
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
      }
    } catch (e) {
      console.log("error:", e)
      return alert("현재 페이지에 오류가 있습니다. 잠시후 다시 시도해주세요.")
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
      <CustomHeader />
      <StyledContainerInner>
        {!isAnalysis && (
          <>
            <StyledCenterWrapper>
              <Image src="/logo.webp" width={120} height={120} alt="logo" />
              <StyledCenteredTitle>우리 아이 키 잘 크고 있을까요?</StyledCenteredTitle>
            </StyledCenterWrapper>

            <StyledField>
              <StyledLabel htmlFor="birthday">출생일</StyledLabel>
              <StyledValue>
                <Input id="birthday" type="date" value={birthday} onChange={handleBirthdayChange} />
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
                <Input
                  id="height"
                  type="number"
                  value={height}
                  padding="40px"
                  placeholder="입력해주세요"
                  onChange={handleHeightChange}
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
            <AdBanner />
          </>
        )}
      </StyledContainerInner>
    </StyledContainer>
  )
}

const BORDER_COLOR = "#959ca6"
const BORDER_FOCUS_COLOR = "#52565d"
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background: lightyellow;
  position: relative;
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
  font-size: 20px;
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
  color: ${BORDER_COLOR};
  border: 2px solid ${BORDER_COLOR};
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
const StyledCenterWrapper = styled.div`
  text-align: center;
`
const Input = styled.input<{ padding?: string }>`
  border: 0;
  border-bottom: 2px solid ${BORDER_COLOR};
  font-size: 20px;
  color-scheme: light;
  color: black;
  background: transparent;
  width: 100%;
  &:focus {
    outline: none;
    border-color: ${BORDER_FOCUS_COLOR};
  }
  ${({ padding }) => padding && `padding-right: ${padding};`}
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
