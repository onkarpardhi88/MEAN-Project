import { NgModule } from "@angular/core";
import { PostListComponent } from "./post-list/post-list.component";
import { PostComponent } from "./post/post.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AngularMeterialModule } from "../angular-material.module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        PostComponent,
        PostListComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AngularMeterialModule,
        RouterModule
    ]
})
export class PostModule {

}