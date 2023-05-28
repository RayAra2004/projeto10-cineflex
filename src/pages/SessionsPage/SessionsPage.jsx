import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import styled from "styled-components"

export default function SessionsPage() {
    
    const {idFilme} = useParams();
    const [sessoes, setSessoes] = useState(undefined);
    
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`);

        promise.then(res => 
            setSessoes(res.data)
            );
    }, []);

    if(sessoes === undefined){
        return <><p>Carregando...</p></>
    }

    console.log(sessoes)

    return (
        <PageContainer>
            Selecione o horário
            <div>
                    {
                    sessoes.days.map(sessao =>
                        <SessionContainer key={sessao.id} data-test="movie-day">
                            {sessao.weekday} - {sessao.date}
                            <ButtonsContainer>
                                {sessao.showtimes.map(time =>
                                    <Link key={time.id} to={`/assentos/${time.id}`} data-test="showtime">
                                        <button >{time.name}</button>
                                    </Link>
                                    )}
                            </ButtonsContainer>
                        </SessionContainer>
                    )}
            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={sessoes.posterURL} alt={sessoes.title} />
                </div>
                <div>
                    <p>{sessoes.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
        background: #E8833A;
        border-radius: 3px;
        color: #FFFFFF;
        width: 82px;
        height: 43px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.02em;
        color: #FFFFFF;
        border: none;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`