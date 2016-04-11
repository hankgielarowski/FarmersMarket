package com.theironyard.services;

import com.theironyard.entities.Inventory;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

/**
 * Created by drewmunnerlyn on 4/8/16.
 */
public interface InventoryRepository extends CrudRepository<Inventory, Integer> {
    ArrayList<Inventory> findByCategory(String category);
}
