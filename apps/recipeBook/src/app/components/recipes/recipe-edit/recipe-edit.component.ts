import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component ({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit{
	id: number;
	editMode = false;

	constructor(
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.params
		.subscribe(
			(params: Params) => {
				this.id = parseInt(params.id, 10);
				this.editMode = !!params['id'] === true;
				console.log('edit: ', this.editMode);
			}
		)
	}
}