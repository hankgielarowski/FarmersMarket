package com.theironyard.services;

import com.theironyard.entities.Purchase;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

/**
 * Created by drewmunnerlyn on 4/11/16.
 */
public interface PurchaseRepository extends CrudRepository<Purchase, Integer> {
    ArrayList<Purchase> findByIsPendingApprovalAndFarmer(boolean isPendingApproval, String farmer);
    ArrayList<Purchase> findByIsPendingApprovalAndBuyer(boolean isPendingApproval, String buyer);
}
