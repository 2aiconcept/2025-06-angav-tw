import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { OrderListPageComponent } from './order-list-page.component';
import { OrderFacade } from '@orders/store/order.facade';
import { IOrder } from '@orders/interfaces';
import { OrderStatus } from '@orders/enums';
import { ChangeDetectionStrategy } from '@angular/core';

describe('OrderListPageComponent', () => {
  let component: OrderListPageComponent;
  let fixture: ComponentFixture<OrderListPageComponent>;
  let mockOrderFacade: any;
  let mockRouter: any;

  // Données de test
  const mockOrders: IOrder[] = [
    {
      id: 'chsjr',
      description: 'Commande test 1',
      price: 100,
      quantity: 2,
      customer: 'Client 1',
      status: OrderStatus.Pending,
    },
    {
      id: 'sdfg',
      description: 'Commande test 2',
      price: 50,
      quantity: 1,
      customer: 'Client 2',
      status: OrderStatus.Pending,
    },
  ];

  beforeEach(async () => {
    // Création des mocks avec Jest
    mockOrderFacade = {
      loadOrders: jest.fn(),
      delete: jest.fn(),
      orders: signal(mockOrders),
      isLoading: signal(false),
      error: signal(null),
    };

    mockRouter = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [OrderListPageComponent], // Standalone component
      providers: [
        { provide: OrderFacade, useValue: mockOrderFacade },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initialisation du composant', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should inject OrderFacade and Router correctly', () => {
      expect(component['orderFacade']).toBe(mockOrderFacade);
      expect(component['router']).toBe(mockRouter);
    });

    it('should expose facade signals correctly', () => {
      expect(component.collection).toBe(mockOrderFacade.orders);
      expect(component.isLoading).toBe(mockOrderFacade.isLoading);
      expect(component.error).toBe(mockOrderFacade.error);
    });
  });

  describe('Méthode onAdd()', () => {
    it('should navigate to orders/add route', () => {
      // Act
      component.onAdd();

      // Assert
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/orders/add']);
      expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
    });
  });

  describe('Méthode onEdit()', () => {
    it('should navigate to orders/edit/:id route with correct order id', () => {
      // Arrange
      const testOrder = mockOrders[0];

      // Act
      component.onEdit(testOrder);

      // Assert
      expect(mockRouter.navigate).toHaveBeenCalledWith([
        '/orders/edit',
        testOrder.id,
      ]);
      expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
    });
  });

  describe('Méthode onDelete()', () => {
    beforeEach(() => {
      // Mock de window.confirm
      jest.spyOn(window, 'confirm');
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should call facade.delete when user confirms and order has id', () => {
      // Arrange
      const testOrder = mockOrders[0];
      jest.spyOn(window, 'confirm').mockReturnValue(true);

      // Act
      component.onDelete(testOrder);

      // Assert
      expect(window.confirm).toHaveBeenCalledWith(
        `Êtes-vous sûr de vouloir supprimer la commande "${testOrder.description}" ?`
      );
      expect(mockOrderFacade.delete).toHaveBeenCalledWith(testOrder.id);
      expect(mockOrderFacade.delete).toHaveBeenCalledTimes(1);
    });

    it('should not call facade.delete when user cancels', () => {
      // Arrange
      const testOrder = mockOrders[0];
      jest.spyOn(window, 'confirm').mockReturnValue(false);

      // Act
      component.onDelete(testOrder);

      // Assert
      expect(window.confirm).toHaveBeenCalledWith(
        `Êtes-vous sûr de vouloir supprimer la commande "${testOrder.description}" ?`
      );
      expect(mockOrderFacade.delete).not.toHaveBeenCalled();
    });

    it('should not call facade.delete when order has no id', () => {
      // Arrange
      const orderWithoutId: IOrder = {
        description: 'Test sans ID',
        price: 10,
        quantity: 1,
        customer: 'Test Customer',
        status: OrderStatus.Pending,
      };
      jest.spyOn(window, 'confirm').mockReturnValue(true);

      // Act
      component.onDelete(orderWithoutId);

      // Assert
      expect(window.confirm).toHaveBeenCalled();
      expect(mockOrderFacade.delete).not.toHaveBeenCalled();
    });

    it('should not call facade.delete when order id is null', () => {
      // Arrange
      const orderWithNullId: IOrder = {
        id: null as any,
        description: 'Test avec ID null',
        price: 10,
        quantity: 1,
        customer: 'Test Customer',
        status: OrderStatus.Pending,
      };
      jest.spyOn(window, 'confirm').mockReturnValue(true);

      // Act
      component.onDelete(orderWithNullId);

      // Assert
      expect(window.confirm).toHaveBeenCalled();
      expect(mockOrderFacade.delete).not.toHaveBeenCalled();
    });

    it('should display correct confirmation message with order description', () => {
      // Arrange
      const testOrder: IOrder = {
        id: '123',
        description: 'Commande spéciale avec "guillemets"',
        price: 10,
        quantity: 1,
        customer: 'Test Customer',
        status: OrderStatus.Pending,
      };
      jest.spyOn(window, 'confirm').mockReturnValue(false);

      // Act
      component.onDelete(testOrder);

      // Assert
      expect(window.confirm).toHaveBeenCalledWith(
        `Êtes-vous sûr de vouloir supprimer la commande "Commande spéciale avec "guillemets"" ?`
      );
    });
  });

  describe('Template Integration', () => {
    it('should render orders when collection has data', () => {
      // Arrange - modifier le signal pour avoir des données
      mockOrderFacade.orders = signal(mockOrders);
      fixture.detectChanges();

      // Assert
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('Commande test 1');
      expect(compiled.textContent).toContain('Commande test 2');
    });

    it('should show loading state when isLoading is true', () => {
      // Arrange
      mockOrderFacade.isLoading.set(true);
      fixture.detectChanges();

      // Assert
      const compiled = fixture.nativeElement;
      expect(
        compiled.textContent.includes('Chargement des commandes...') ||
          compiled.querySelector('.spinner-border')
      ).toBeTruthy();
    });

    it('should show error message when error signal has value', () => {
      // Arrange
      const errorMessage = 'Erreur de chargement des commandes';
      mockOrderFacade.error.set(errorMessage);
      fixture.detectChanges();

      // Assert
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain(`Erreur : ${errorMessage}`);
    });
  });

  describe('Event Handling', () => {
    it('should call onAdd when add button is clicked', () => {
      // Arrange
      spyOn(component, 'onAdd');
      const addButton =
        fixture.nativeElement.querySelector('[data-testid="add-button"]') ||
        fixture.nativeElement.querySelector('button');

      // Act
      if (addButton) {
        addButton.click();
        fixture.detectChanges();
      }

      // Assert
      // Adapter selon votre template réel
      expect(component.onAdd).toHaveBeenCalled();
    });
  });
});
