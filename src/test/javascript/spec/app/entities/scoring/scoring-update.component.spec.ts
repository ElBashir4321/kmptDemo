import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KmptDemoTestModule } from '../../../test.module';
import { ScoringUpdateComponent } from 'app/entities/scoring/scoring-update.component';
import { ScoringService } from 'app/entities/scoring/scoring.service';
import { Scoring } from 'app/shared/model/scoring.model';

describe('Component Tests', () => {
  describe('Scoring Management Update Component', () => {
    let comp: ScoringUpdateComponent;
    let fixture: ComponentFixture<ScoringUpdateComponent>;
    let service: ScoringService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KmptDemoTestModule],
        declarations: [ScoringUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ScoringUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ScoringUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ScoringService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Scoring(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Scoring();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
