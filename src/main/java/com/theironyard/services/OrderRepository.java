package com.theironyard.services;

import com.theironyard.entities.Inventory;
import com.theironyard.entities.Order;
import com.theironyard.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by drewmunnerlyn on 4/11/16.
 */
public interface OrderRepository extends CrudRepository<Order, Integer> {
    ArrayList<Order> findByIsPendingApprovalAndFarmer(boolean isPendingApproval, User farmer);
    ArrayList<Order> findByIsPendingApprovalAndBuyer(boolean isPendingApproval, User buyer);
    ArrayList<Order> findByFarmerOrBuyer(User user, User user2);
    List<Order> findByIsPendingApprovalAndInventory(boolean isPendingApproval, Inventory inventory);
}
