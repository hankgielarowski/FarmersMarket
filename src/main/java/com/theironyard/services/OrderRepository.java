package com.theironyard.services;

import com.theironyard.entities.Order;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

/**
 * Created by drewmunnerlyn on 4/11/16.
 */
public interface OrderRepository extends CrudRepository<Order, Integer> {
    ArrayList<Order> findByIsPendingApprovalAndFarmer(boolean isPendingApproval, String farmer);
    ArrayList<Order> findByIsPendingApprovalAndBuyer(boolean isPendingApproval, String buyer);
    ArrayList<Order> findByFarmerOrBuyer(String userName, String userName2);
}
