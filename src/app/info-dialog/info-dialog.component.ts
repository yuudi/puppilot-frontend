import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { SemverPipe } from '../market/semver.pipe';
import { ApiRoutine } from '../types';

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, SemverPipe],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss',
})
export class InfoDialogComponent {
  data = inject<ApiRoutine>(MAT_DIALOG_DATA);
}
