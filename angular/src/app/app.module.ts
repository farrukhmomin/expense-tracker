import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VendorReducer } from './store/reducers/vendor/vendor.reducer';
import { ExpenseTypeReducer } from './store/reducers/expense/expense-type.reducer';
import { ExpenseReducer } from './store/reducers/expense/expense.reducer';
import { IncomeReducer } from './store/reducers/income/income.reducer';
import { VendorExpenseTypeReducer } from './store/reducers/vendor-expense-type/vendor-expense-type.reducer';
import { MemberReducer } from './store/reducers/member/member.reducer';
import { IgnoreTagsReducer } from './store/reducers/tags/ignore-tags.reducer';

import { VendorEffects } from './store/effects/vendor.effect';
import { IgnoreTagsEffect } from './store/effects/ignore-tags.effect';
import { ExpenseTypeEffect } from './store/effects/expense-type.effect';
import { VendorExpenseTypeEffect } from './store/effects/vendor-expense-type.effect';
import { IncomeEffects } from './store/effects/income.effect';
import { ExpenseEffect } from './store/effects/expense.effect';
import { MemberEffect } from './store/effects/member.effect';

import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      vendors: VendorReducer,
      vendorExpenseType: VendorExpenseTypeReducer,
      income: IncomeReducer,
      expenseTypes: ExpenseTypeReducer,
      expenses: ExpenseReducer,
      members: MemberReducer,
      ignoreTags: IgnoreTagsReducer
    }, {}),
    EffectsModule.forRoot([VendorEffects, ExpenseTypeEffect, VendorExpenseTypeEffect, IncomeEffects, ExpenseEffect,
      MemberEffect, IgnoreTagsEffect]),
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
