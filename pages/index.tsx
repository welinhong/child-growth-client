import { ChangeEventHandler, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { getMonthsAfterBirth } from "../src/utils/calculator"
import TotalAnalysis from "../src/components/TotalAnalysis/TotalAnalysis"

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
    // TODO: baseUrl 변경 될 예정
    const baseUrl = "https://fbbe7fc6-8525-4598-a4f5-3556d5e215a9.mock.pstmn.io"
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
              <h3>우리 아이 키 잘 크고 있을까요?</h3>
            </StyledCenterBox>

            <StyledField>
              <StyledLabel htmlFor="birthday">출생일</StyledLabel>
              <StyledValue>
                <input type="date" id="birthday" value={birthday} onChange={handleBirthdayChange} />
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
                <input
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
  background-color: lightgray;
`
const StyledContainerInner = styled.div`
  min-width: 370px;
  max-width: 800px;
  padding: 30px 20px;
  border: 3px solid orange;
  border-radius: 8px;
  background-color: #fff;
`
const StyledField = styled.div`
  display: flex;
  margin: 30px 0;
`
const StyledLabel = styled.label`
  display: block;
  width: 100px;
`
const StyledValue = styled.div``
const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
`
const StyledCenterBox = styled.div`
  display: flex;
  justify-content: center;
`
