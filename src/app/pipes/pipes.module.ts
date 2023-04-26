import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LanguagePipe } from "./language/language.pipe";
import { OrdinalSufixPipe } from './ordinal-sufix/ordinal-sufix.pipe';
import { NaturalTypePipe } from './natural-type/natural-type.pipe';
import { DefaultPipe } from './default/default.pipe';

@NgModule({
    declarations: [
        LanguagePipe,
        OrdinalSufixPipe,
        NaturalTypePipe,
        DefaultPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LanguagePipe,
        OrdinalSufixPipe,
        NaturalTypePipe,
        DefaultPipe
    ]
})

export class PipesModule {}