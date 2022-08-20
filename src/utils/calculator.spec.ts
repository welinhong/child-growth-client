import { getMonthsAfterBirth } from "./calculator"

describe("getMonthsAfterBirth", () => {
  test("생년월일을 입력했을 때 개월 수를 반환한다", () => {
    // Arrange
    const birthday = "2022-01-01"
    // Act
    console.log(getMonthsAfterBirth(birthday))
    const sut = getMonthsAfterBirth(birthday)
    // Assert
    expect(sut).toBe(7)
  })
})
