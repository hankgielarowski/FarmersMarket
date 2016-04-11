package com.theironyard.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Created by drewmunnerlyn on 4/11/16.
 */

@Entity
@Table(name = "purchases")
public class Purchase {
    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    String category;

    @Column(nullable = false)
    String name; //name of produce item

    @Column(nullable = false)
    String buyer;

    @Column(nullable = false)
    String farmer;

    @Column(nullable = false)
    int quantityPurchased;

    @Column(nullable = false)
    double price;

    @Column(nullable = false)
    LocalDateTime timeStamp;

    @Column(nullable = false)
    boolean isPendingApproval;

    @Column(nullable = false)
    String dateDesiredByBuyer;

    public Purchase() {
    }

    public Purchase(String category, String name, String buyer, String farmer, int quantityPurchased, double price, LocalDateTime timeStamp, boolean isPendingApproval, String dateDesiredByBuyer) {
        this.category = category;
        this.name = name;
        this.buyer = buyer;
        this.farmer = farmer;
        this.quantityPurchased = quantityPurchased;
        this.price = price;
        this.timeStamp = timeStamp;
        this.isPendingApproval = isPendingApproval;
        this.dateDesiredByBuyer = dateDesiredByBuyer;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    public String getFarmer() {
        return farmer;
    }

    public void setFarmer(String farmer) {
        this.farmer = farmer;
    }

    public int getQuantityPurchased() {
        return quantityPurchased;
    }

    public void setQuantityPurchased(int quantityPurchased) {
        this.quantityPurchased = quantityPurchased;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public boolean isPendingApproval() {
        return isPendingApproval;
    }

    public void setPendingApproval(boolean pendingApproval) {
        isPendingApproval = pendingApproval;
    }

    public String getDateDesiredByBuyer() {
        return dateDesiredByBuyer;
    }

    public void setDateDesiredByBuyer(String dateDesiredByBuyer) {
        this.dateDesiredByBuyer = dateDesiredByBuyer;
    }

}
