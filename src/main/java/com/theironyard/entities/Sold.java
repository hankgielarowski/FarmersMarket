package com.theironyard.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Created by drewmunnerlyn on 4/13/16.
 */
@Entity
@Table(name = "sales")
public class Sold {
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
    int quantitySold;

    @Column(nullable = false)
    double price;

    @Column(nullable = false)
    LocalDateTime timeStampSold;

    @Column(nullable = false)
    String dateSold;

    public Sold() {
    }

    public Sold(String category, String name, String buyer, String farmer, int quantitySold, double price, LocalDateTime timeStampSold, String dateSold) {
        this.category = category;
        this.name = name;
        this.buyer = buyer;
        this.farmer = farmer;
        this.quantitySold = quantitySold;
        this.price = price;
        this.timeStampSold = timeStampSold;
        this.dateSold = dateSold;
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

    public int getQuantitySold() {
        return quantitySold;
    }

    public void setQuantitySold(int quantitySold) {
        this.quantitySold = quantitySold;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public LocalDateTime getTimeStampSold() {
        return timeStampSold;
    }

    public void setTimeStampSold(LocalDateTime timeStampSold) {
        this.timeStampSold = timeStampSold;
    }

    public String getDateSold() {
        return dateSold;
    }

    public void setDateSold(String dateSold) {
        this.dateSold = dateSold;
    }
}
