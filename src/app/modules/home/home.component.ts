import { authResponse } from './../../models/user/auth/authResponse';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

import { authRequest } from 'src/app/models/user/auth/authRequest';
import { SignupRequest } from 'src/app/models/user/SignupRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy{
  private destroy$ = new Subject<void>()

  loginCard = true;

  //formGroup
  loginForm = this.formBuilder.group({
    email: ['', Validators.required], //formControlName
    password: ['', Validators.required]
  })
  //forGroup
  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieservice: CookieService,
    private messageService: MessageService,
    private router: Router
  ) { }

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as authRequest)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            if (response) {
              this.cookieservice.set('USER_INFO', response?.token)
              this.loginForm.reset()
              this.router.navigate(['/dashboard'])

              //abaixo, adição do toast
              this.messageService.add({
                severity: 'success',
                summary: 'Login efetuado',
                detail: `seja bem vindo novamente ${response?.name}`,
                life: 2500,
              })
            }
          },
          error: (err) => {
            //adição do toast
            this.messageService.add({
              severity: 'error',
              summary: 'erro',
              detail: 'Usuário não axistente.',
              life: 3000,
            })
            console.log(err)

          }

        })
    }
  }

  onSubmitRegisterform(): void {
    if (this.registerForm.value && this.registerForm.valid) {
      this.userService.signupUser(
        this.registerForm.value as SignupRequest)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            if (response) {

              this.registerForm.reset()
              this.loginCard = true

              //adição do toast
              this.messageService.add({
                severity: 'success',
                summary: 'sucesso.',
                detail: 'Conta criada com sucesso',
                life: 2500,
              })
            }
          },
          error: (err) => {
            //adição do toast
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Erro ao criar a conta.',
              life: 3000,
            })
            console.log(err)
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

