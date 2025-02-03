// header-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeaderStateService {
  private isLoginView = new BehaviorSubject<boolean>(false);
  currentHeaderState = this.isLoginView.asObservable();

  setLoginViewState(isLogin: boolean) {
    this.isLoginView.next(isLogin);
  }
}
