import { Link } from "react-router-dom";
import styled from "styled-components"

export default function SuccessPage(props) {
    const {dadosCompra} = props;
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{dadosCompra.nomeFilme}</p>
                <p>{dadosCompra.data} - {dadosCompra.horario}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                {dadosCompra.assentos.map(assento =>
                    <p>Assento {assento}</p>
                )}
        
            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>Nome: {dadosCompra.nome}</p>
                <p>CPF: {dadosCompra.cpf}</p>
            </TextContainer>
            <Link to={'/'}>
                <button>Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        background: #E8833A;
        border-radius: 3px;
        margin-top: 50px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.04em;
        color: #FFFFFF;
        border: none;
        width: 225px;
        height: 42px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.04em;
    color: #293845;
    strong {    
        margin-bottom: 10px;
        p{
            font-weight: bold;
        }
    }
    p{
        font-weight: 400;
    }
    
`