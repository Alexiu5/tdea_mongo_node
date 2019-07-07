const hbs = require('hbs');
const cursosCtrl = require('../controllers/cursos.controller')


hbs.registerHelper('ifCond', function(v1, v2, options) {
	if(v1 === v2) {
	  return options.fn(this);
	}
	return options.inverse(this);
});


hbs.registerHelper('listarCursosCoordinador', (cursos)=>{
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
			<td><a href="/curso/editar/${elm._id}" class="btn btn-warning detail-btn" >Editar</a></td>
			<td><a href="/curso/eliminar/${elm._id}" class="btn btn-warning detail-btn" >Eliminar</a></td>
		</tr>`
	})

	result = result + `</tbody> </table>`
	return result
})


hbs.registerHelper('listarCurososInteresado', cursos => {
	return '<p> Hello interesado</p>'
})


const blockOfCourses = cursos => {
	let content = [];
	const headContent = `
			<div class="col-md-4 col-sm-6">
		`
	content.push(headContent)
			
	cursos.forEach(elm=>{
		let card = `
		<div class="card text-center">
			<div class="card-header">	
				${elm.nombre}
			</div>
			<div class="card-body">
				<p class="card-text">${elm.descripcion}</p>
				<p class="card-text">
					Intensidad horaria: ${elm.intensidadHoraria} <br>
					Valor del curso: ${elm.valor} <br>
					Cant. cupos: ${elm.cantCupos}
				</p>
				<a href="/curso/registrar/${elm.idCurso}" class="btn btn-primary">Registrarse</a>
			</div>
		</div>
		`
		content.push(card)
	})		
	
	const footContent =  `
			</div>
	`
	content.push(footContent)

	return content.join("")
	
}
hbs.registerHelper('listarCursosAspirante', blockOfCourses)

