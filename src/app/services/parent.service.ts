import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/model/config';
import { parentEleve } from 'src/model/Parent';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private http: HttpClient) { }

  searchParent(query: string) {
    return this.http.post<{ payload: Array<parentEleve> }>(`${config.apiUrl}/parent/getParents`, { payload: query })
      .pipe(
        map(data => data.payload)
      )
  }
}
