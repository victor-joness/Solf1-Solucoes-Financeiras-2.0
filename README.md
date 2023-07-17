# Solf1-Solucoes-Financeiras


## 💻 Projeto

Projeto De um Sistema de Controle Financeiro Pessoal, Realizado para a Disciplina de Projeto Integrador 1 do curso de Ciências da computação na UFC.

## 🚀 Tecnologias
Esse projeto foi desenvolvido com as seguintes tecnologias:

> Front-End: React, CSS, HTML, JavaScript e algumas Bibliotecas;                                      
> Back-End: MySql, Node.js e algumas Bibliotecas;                                                       

## 📌 Habilidades

Nesse projeto, fui capaz de:

- Trabalhar com estado, componentes;
- Fazer o uso e o estudo das seguintes bibliotecas Axios, Express, Yup, Formik, Cors, Charts.js, bcrypt, nodemon, React-Router-dom;
- Uso do banco de dados MySql WorkBench
- Feito alguns CRUDS

## :memo: Funcionalidades: 
- 1 Criação de conta;✔️                           
- 2 Login;✔️                             
- 3 Logout;✔️                             
- 4 Edição de conta; ✔️                            
- 5 Remoção de conta;✔️                                      
- 6 CRUD de receita; ✔️                                            
- 7 CRUD de cartão de crédito;  ✔️                             
- 8 CRUD de cartão de débito; ✔️                                     
- 9 CRUD de categoria. Uma categoria tem apenas o nome; ✔️                                          
- 10 CRUD de despesa; ✔️                                                
• Na adição de despesa verificações são obrigatórias. Se a despesa for em cartão de
crédito, é necessário verificar se a despesa não ultrapassará o valor limite do cartão e se
não ultrapassou o dia de fechamento da fatura, para inclusão da despesa na fatura do
mês atual ou do mês seguinte. Caso a despesa seja em cartão de débito, deve-se verificar
se ainda existe saldo no cartão (receita do mês);                                                  
• Nas despesas pagas em cartão de crédito, o valor da prestação será incluído automaticamente nas faturas seguintes de acordo com o número de prestações em que a despesa é
dividida;✔️                                                                                         
- 11 Nas listagens de cada CRUD deverão existir opções para reordenação ou filtragem dos itens.
Por exemplo, as despesas listadas podem ser reordenadas pelo valor, data, categoria, etc. Além
Projeto 2
disso, as despesas são listráveis pelo mês, categoria, etc;✔️                                                                                                 
- BackEnd                                                   
  -> banco de dados (MySql) ✔️                                                                                         
  -> Criptografia da senha no banco de dados ✔️;
  
## 📝 Fotos do projeto                                                                         
  -> https://imgur.com/gallery/u0nSXCl                                               

## 📝 Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [ ] Realizar testes unitários;
- [ ] Otimização;
- [ ] Melhorias no Css;
- [ ] Adição de Funcionalidades voltada pra deficientes;
- [ ] Modo preto/Branco;
- [ ] Mudar as variaveis globais para useContext;
# 👷 Como rodar

```bash
# Clonar o repositório
git clone https://github.com/victor-joness/Solf1-Solucoes-Financeiras-2.0

# Entrar numa IDE de sua preferência 

# Executar o servidor ou usar um puglin que criar um servidor

```

## ⬇️ Instalando dependências

  ```bash
  Client
    $ cd Client
    $ npm install or $ yarn install
    $ npm start or $ yarn start
  Server
    $ cd Server
    $ npm install or $ yarn install
    $ npm start or $ yarn start
    Change your mySQL database data server/index.js
  ```
  

## 🤔 Como contribuir <br/>

- Faça um fork desse repositório.
- Cria uma branch com a sua feature: `git checkout -b minha-feature`
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`
- Faça push para a sua branch: `git push origin minha-feature`

- Depois que o merge da sua *pull request* for feito, você pode deletar a sua *branch*


## :mortar_board: Autores
```bash
# Agradecimentos:
  - @vitorLostadaC (Me ajudou com os Cruds);
```

<table align="center">
    <tr>
        <td align="center">
            <a href="https://github.com/victor-joness">
                <img src="https://i.imgur.com/vBnNiVV.png" width="150px;" alt="Foto Victor"/>
                <br />
                <sub><b>Victor Mesquita<sub><b>
            </a>
        </td> 
        <td align="center">
            <a href="https://github.com/SamuelLopess03">
                <img src="" width="150px;" alt="Foto Samuel"/>
                <br />
                <sub><b>Samuel Lopes<sub><b>
            </a>
        </td> 
    </tr>
</table>
              
## 📄 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.
