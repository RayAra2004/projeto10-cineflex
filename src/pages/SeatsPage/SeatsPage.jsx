import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import styled from "styled-components"

export default function SeatsPage(props) {
    const {dadosCompra, setDadosCompra} = props; 

    const {idSessao} = useParams();
    const [assentos, setAssentos] = useState(undefined);
    const [filme, setFilme] = useState([]);
    const [infosGerais, setInfosGerais] = useState([]);
    const [selecionados, setSelecionados] = useState([]);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [numeroAssentos, setNumeroAssentos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);

        promise.then(res => {
            console.log(res.data);
            setAssentos(res.data.seats);
            setFilme(res.data.movie);
            setInfosGerais(res.data);

        })

    }, [])

    function selecionarAssento(selecionado, id){
        
        if(!selecionado){
            alert('Este assento não está disponível');
        }else if(selecionados.includes(id)){
            const index = selecionados.indexOf(id);
            selecionados.splice(index, 1);
            setSelecionados([...selecionados]);
        }else{
            setSelecionados([...selecionados, id]);
        }
    }
    const numAssentos = [];
    function buscarNumAssentos(assentos, selecionados){
        

        assentos.forEach(assento =>{
            if(selecionados.includes(assento.id)){
                numAssentos.push(assento.name)
            }
        })
    }

    function reservarAssentos(e){
        e.preventDefault();

        const objReserva = {
            ids: selecionados,
	        name: nome,
	        cpf: cpf
        }
        
        const promise = axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', objReserva);
        promise.then(res => {
            
            buscarNumAssentos(assentos, selecionados);

            const objCompra = {
                nomeFilme: infosGerais.movie.title,
                horario: infosGerais.name,
                data: infosGerais.day.date,
                assentos: numAssentos,
                nome,
                cpf
            };

            setDadosCompra(objCompra);
            navigate('/sucesso');
        })
        promise.catch(res => alert(res.data.response.message))
    }
    
    if(assentos === undefined){
        return <><p>Carregando...</p></>
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assentos.map(assento =>
                    <SeatItem 
                        onClick={() => selecionarAssento(assento.isAvailable, assento.id)}
                        indisponivel = {!assento.isAvailable}
                        selected = {selecionados.includes(assento.id)}
                    >{assento.name}</SeatItem>
                )}
                
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle borda= {'#0E7D71'} cor = {'#1AAE9E'}/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle borda= {'#7B8B99'} cor = {'#C3CFD9'}/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle borda= {'#F7C52B'} cor = {'#FBE192'}/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <form onSubmit={reservarAssentos}>
                    <label htmlFor="nome">Nome do Comprador:</label>
                    <input id="nome" name="nome" onChange={e => setNome(e.target.value)} value={nome} placeholder="Digite seu nome..."  required/>

                    <label htmlFor="cpf">CPF do Comprador:</label>
                    <input id="cpf" name="cpf" onChange={e => setCpf(e.target.value)} value={cpf} placeholder="Digite seu CPF..." required/>

                    <button type="submit">Reservar Assento(s)</button>
                </form>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={filme.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{filme.title}</p>
                    <p>{infosGerais.day.weekday} - {infosGerais.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const  FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.borda};         // Essa cor deve mudar
    background-color: ${props => props.cor};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid;       // Essa cor deve mudar
    border-color: ${props => {
        if(props.selected){
            return '#0E7D71';
        }if(props.indisponivel){
            return '#F7C52B'
        }else{     
        return '#7B8B99'
        }
        }};
    background-color: ${props => {
        if(props.selected){
            return '#1AAE9E';
        }if(props.indisponivel){
            return '#FBE192'
        }else{     
        return '#C3CFD9'
        }
        }};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
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