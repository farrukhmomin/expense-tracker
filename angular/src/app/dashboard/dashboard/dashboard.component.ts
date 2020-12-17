import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IVendor, IVendorExpenseType } from 'src/app/common/interface';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  vendorExpenseTypes: Observable<IVendorExpenseType[]>;
  vendors: Observable<IVendor[]>;

  constructor(private vendorService: VendorService) {
    this.vendors = this.vendorService.getVendor();
    this.vendorExpenseTypes = this.vendorService.getVendorExpenseTypes();
  }

  ngOnInit(): void {
  }

}
