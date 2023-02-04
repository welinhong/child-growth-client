import styled from "styled-components"

const AdBanner = () => {
  return (
    <Container>
      <iframe
        src="https://ads-partners.coupang.com/widgets.html?id=637101&template=carousel&trackingCode=AF6479878&subId=&width=540&height=150"
        width="100%"
        height="150"
        frameBorder="0"
        scrolling="no"
        referrerPolicy="unsafe-url"
      />
      <Description>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</Description>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin-top: 10vh;
`
const Description = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 14px;
  color: #959ca6;
`

export default AdBanner
