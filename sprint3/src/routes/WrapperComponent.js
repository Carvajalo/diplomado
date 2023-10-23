import Header from "../components/header/botheader/BotHeader";
import { ContainerFull } from "../styled-components/Container.styled";

export const WrapperComponent = ({ children, element }) => {
  const { header } = element.props
  return (
    <ContainerFull height={'auto'}>
      {header && (
        <Header />
      )}
      {children}
    </ContainerFull>
  )
};