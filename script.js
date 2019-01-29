var db = openDatabase("Meubanco", "2.0", "Mybase", 4048);
db.transaction(function(criar){
  criar.executeSql("CREATE TABLE acervo (livro TEXT, autor TEXT, ano_edicao NUMBER)");
});
function salvar() {
  var livro = document.getElementById('livro').value;
  var autor = document.getElementById('autor').value;
  var ano = document.getElementById('ano').value;
  db.transaction(function(armazenar){
    armazenar.executeSql("INSERT INTO acervo (livro, autor, ano_edicao) VALUES (?, ?, ?)", [livro, autor, ano]);
  })
}

function mostrar() {
  db.transaction(function(show) {
    atributo1=document.getElementById('atributo1').value;
    atributo2=document.getElementById('atributo2').value;
    atributo3=document.getElementById('atributo3').value;
    ordenacao1=document.getElementById('ordenacao1').value;
    ordenacao2=document.getElementById('ordenacao2').value;
    ordenacao3=document.getElementById('ordenacao3').value;

    var order_by = " ";

    if (atributo1 === "") {
      order_by = "ORDER BY livro ASC, autor ASC";
    } else {
      order_by = "ORDER BY ";
      if (atributo1 === 'livro') {
        order_by = order_by + "livro ";
      } else if (atributo1 === 'autor'){
        order_by = order_by + "autor ";
      } else {
        order_by = order_by + "ano_edicao ";
      }
      if (ordenacao1 === 'desc'){
        order_by = order_by + "DESC ";
      } else {
        order_by = order_by + "ASC ";
      }

      if (atributo2 !== "") {
        order_by = order_by + ", ";
        if (atributo2 === 'livro') {
          order_by = order_by + "livro ";
        } else if (atributo2 === 'autor'){
          order_by = order_by + "autor ";
        } else {
          order_by = order_by + "ano_edicao ";
        }
        if (ordenacao2 === 'desc'){
          order_by = order_by + "DESC ";
        } else {
          order_by = order_by + "ASC ";
        }

        if (atributo3 !== "") {
          order_by = order_by + ", ";
          if (atributo3 === 'livro') {
            order_by = order_by + "livro ";
          } else if (atributo3 === 'autor'){
            order_by = order_by + "autor ";
          } else {
            order_by = order_by + "ano_edicao ";
          }
          if (ordenacao3 === 'desc'){
            order_by = order_by + "DESC ";
          } else {
            order_by = order_by + "ASC ";
          }
        }
      }
    }

      show.executeSql("SELECT * FROM acervo " + order_by, [], function(show, results) {
        document.write(`<table align="center"> <caption><b><b>Serviço de Ordenação</b></caption>
          <th>Título</th>
          <th>Autor</th>
          <th>Ano de edição</th>`);
        var len = results.rows.length, i;
        for (var i = 0; i < len; i++) {
          document.write(`<tr><td>`+ results.rows.item(i).livro + `</td>
          <td>`+ results.rows.item(i).autor + `</td>
          <td>`+ results.rows.item(i).ano_edicao + `</td></tr>`);
          }
          document.write("</table>");
      })
    });
  }
