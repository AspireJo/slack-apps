import { Injectable } from '@angular/core';

@Injectable()
export class ComponentInteractions {
    private employerId: number;
    private populationType: number;


    setEmployerId(employerId: number) {
        this.employerId = employerId;
    }
    getEmployerId(): number {
        return this.employerId;
    }

    setPopulationType(populationType: number) {
        this.populationType = populationType;
    }
    getPopulationType(): number {
        return this.populationType;
    }

}
