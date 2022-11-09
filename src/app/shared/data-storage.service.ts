import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put(environment.firebaseDatabaseUrl + 'recipes.json', recipes)
            .subscribe();
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(environment.firebaseDatabaseUrl + 'recipes.json')
            .pipe(
                map(
                    recipes => {
                        if (recipes) {
                            return recipes.map(
                                recipe => {
                                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                                }
                            );
                        } else {
                            return [];
                        }
                    }),
                tap(
                    recipes => {
                        this.recipeService.setRecipes(recipes);
                    }
                )
            );

    }
}