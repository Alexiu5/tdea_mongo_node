const hbs = require('hbs');
const cursosCtrl = require('../controllers/cursos.controller')

hbs.registerHelper('listar', (listado) => {
let texto = `	<form action="/eliminar" method="post">
		<table class='table table-striped table-hover'> 
				<thead class='thead-dark'>
				<th>Nombre</th>
				<th>Matematicas</th>
				<th>Ingles</th>
				<th>Programacion</th>
				<th></th>
				</thead>
				<tbody>`;
	listado.forEach(estudiante =>{
		texto = texto + 
				`<tr>
				<td> ${estudiante.nombre} </td>
				<td> ${estudiante.matematicas} </td>
				<td> ${estudiante.ingles}</td>
				<td> ${estudiante.programacion} </td>
				<td><button class="btn btn-danger" name="nombre" value="${estudiante.nombre}">Eliminar</button></td>
				
				</tr> `;
	})
	texto = texto + '</tbody> </table></form>';	
	return texto;

});


hbs.registerHelper('listarCursos', (cursos)=>{
	let result =  `<table class="table table-striped" >
	<thead>
		<tr style="text-transform: capitalize">
			<th>Id Curso</th>
			<th>nombre del curso</th>
			<th>Modalidad</th>
			<th>Intensidad horaria</th>
			<th>cant. Cupos</th>
			<th>Valor</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
	`
	cursos.forEach(elm => {
		result = result + `
		<tr>
			<td>${elm.idCurso}</td>
			<td>${elm.nombre}</td>
			<td>${elm.modalidad}</td>
			<td>${elm.intensidadHoraria}</td>
			<td>${elm.cantCupos}</td>
			<td>${elm.valor}</td>
			<td><a href="/cursos/${elm.idCurso}" class="btn btn-warning">editar</a></td>
		</tr>`
	})

	result = result + `</tbody> </table>`
	return result
})
