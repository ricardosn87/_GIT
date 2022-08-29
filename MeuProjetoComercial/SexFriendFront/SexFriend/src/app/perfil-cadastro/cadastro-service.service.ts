import { Perfil } from '../Models/perfil.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CadastroServiceService {

  url = 'https://localhost:7167/api/cadastro'

  constructor(
    private http: HttpClient
    ) { }

  save(p: Perfil) {
    return this.http.post(`${this.url}`, p)
      .pipe(
        tap( 
          {
            next: (data) => console.log(data),
            error: (error) => console.log(error)
          }
        ))
  }

  getStatesFromBrazil(): string[] {
    let list: string[] =
      ['AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO'];

    return list
  }

  getRangerDate(): string[] {
    let rangerYears: string[] = []
    let dataAtual = moment()
    let dataAtualCalc = moment()

    let dateLater18Years = dataAtual.subtract(18, 'years')
    let dateLater18YearsStart = dataAtualCalc.subtract(18, 'years')

    let dateMinYears = dateLater18Years.subtract(90, 'years')

    for (var i = 0; dateMinYears < dateLater18YearsStart; i++) {
      rangerYears.push(dateMinYears.add(1, 'year').format("yyyy"))
    }

    return rangerYears
  }
}
