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
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin-top: 10vh;
`

export default AdBanner
