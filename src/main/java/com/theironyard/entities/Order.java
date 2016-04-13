package com.theironyard.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Created by drewmunnerlyn on 4/11/16.
 */

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    String category;

    @Column(nullable = false)
    String name; //name of produce item

    @ManyToOne
    User buyer;

    @ManyToOne
    User farmer;

    @Column(nullable = false)
    int quantityOrdered;

    @Column(nullable = false)
    double price;

    @Column(nullable = false)
    LocalDateTime timeStampOrdered;

    @Column(nullable = false)
    String dateDesiredByBuyer;

    @ManyToOne
    Inventory inventory;

    public Order() {
    }

    public Order(String category, String name, User buyer, User farmer, int quantityOrdered, double price, LocalDateTime timeStampOrdered, String dateDesiredByBuyer, Inventory inventory) {
        this.category = category;
        this.name = name;
        this.buyer = buyer;
        this.farmer = farmer;
        this.quantityOrdered = quantityOrdered;
        this.price = price;
        this.timeStampOrdered = timeStampOrdered;
        this.dateDesiredByBuyer = dateDesiredByBuyer;
        this.inventory = inventory;
    }

    public int getId() {
        return id;
    }

//    public void setId(int id) {
//        this.id = id;
//    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getBuyer() {
        return buyer;
    }

    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }

    public User getFarmer() {
        return farmer;
    }

    public void setFarmer(User farmer) {
        this.farmer = farmer;
    }

    public int getQuantityOrdered() {
        return quantityOrdered;
    }

    public void setQuantityOrdered(int quantityOrdered) {
        this.quantityOrdered = quantityOrdered;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public LocalDateTime getTimeStampOrdered() {
        return timeStampOrdered;
    }

    public void setTimeStampOrdered(LocalDateTime timeStampOrdered) {
        this.timeStampOrdered = timeStampOrdered;
    }

    public String getDateDesiredByBuyer() {
        return dateDesiredByBuyer;
    }

    public void setDateDesiredByBuyer(String dateDesiredByBuyer) {
        this.dateDesiredByBuyer = dateDesiredByBuyer;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }
}
