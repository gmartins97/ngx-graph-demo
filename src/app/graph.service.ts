import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private artifactsAPIUrl = 'http://localhost:9091/api/v2/artifacts';

  constructor(private http: HttpClient) {
  }

  getIsUsedGraph(tenant: string, id: string, limit: number, page: number): Observable<any> {
    return this.http.get(this.artifactsAPIUrl + '/' + id + '/is-used', {
      headers: {
        'X-Tenant': tenant,
        'X-Lang': 'en_gb',
        'X-User-Id': 'asd'
      },
      params: {
        limit: limit.toString(),
        page: page.toString()
      }
    });
  }

  getUsesGraph(tenant: string, id: string, limit: number, page: number): Observable<any> {
    return this.http.get(this.artifactsAPIUrl + '/' + id + '/uses', {
      headers: {
        'X-Tenant': tenant,
        'X-Lang': 'en_gb',
        'X-User-Id': 'asd'
      },
      params: {
        limit: limit.toString(),
        page: page.toString()
      }
    });
  }
}
