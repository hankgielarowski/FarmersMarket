package com.theironyard.services;

import com.theironyard.entities.Purchase;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by drewmunnerlyn on 4/11/16.
 */
public interface PurchaseRepository extends CrudRepository<Purchase, Integer> {
}
