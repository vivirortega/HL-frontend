import Header from "../../components/header/header";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { CompanyInfo, Company, Places, Responsibles, Resp } from "./style";
import { BsTrashFill } from "react-icons/bs";
import Responsible from "../../components/responsibles/responsibles";

export default function CardCompany() {
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const [companies, setCompanies] = useState<any[]>([]);
  const [hasResp, setHasResp] = useState(false);
  const [addResponsible, setAddResponsible] = useState(false);
  const URL = `http://localhost:5000`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    renderCompany();
  }, []);

  function renderCompany() {
    const promise = axios.get(`${URL}/company/${id}`, config);
    promise.then((response) => {
      setCompanies(response.data);
    });
    promise.catch((error) => {
      console.log(error);
    });
  }

  function deleteCompany() {
    const promise = axios.delete(`${URL}/company/${id}`, config);

    promise.then((response) => {
      console.log(response);
    });
    promise.catch((error) => {
      console.log(error);
    });
  }

  function addResp() {
    setAddResponsible(true);
  }

  return (
    <>
      <Header />
      <CompanyInfo>
        {companies.map((company, i) => {
          while (i <= 0) {
            return (
              <>
                <Company>
                  <div className="trash-div">
                    <h1>Razão Social: {company.companyName}</h1>
                    <BsTrashFill className="trash" onClick={deleteCompany} />
                  </div>
                  <h2>CNPJ: {company.CNPJ}</h2>
                </Company>
              </>
            );
          }
        })}
        <Places>
          <div className="button">
            <h3>Locais:</h3>
            <button>+</button>
          </div>
          <p>Ainda não tem ninguém</p>
        </Places>
        <Responsibles>
          <div className="button">
            <h4>Responsáveis:</h4>
            <button onClick={addResp}>+</button>
          </div>
          {addResponsible === true ? (
            <Responsible />
          ) : (
            <>
              {companies.map((company, i) => {
                while (i <= 5) {
                  return (
                    <>
                      <Resp>
                        <p>Responsável: {company.responsibleName}</p>
                        <p>Telefone: {company.phone}</p>
                        <p>CEP: {company.responsiblesCEP}</p>
                      </Resp>
                    </>
                  );
                }
              })}
            </>
          )}
        </Responsibles>
      </CompanyInfo>
    </>
  );
}
