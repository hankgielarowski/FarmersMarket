package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by drewmunnerlyn on 4/6/16.
 */
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false, unique = true)
    String userName;

    @Column(nullable = false)
    String passwordHash;

    @Column(nullable = false)
    String userType;

    @Column(nullable = false)
    String companyName;

    @Column(nullable = false)
    String location;

    @Column(nullable = false)
    String phone;

    @Column(nullable = false)
    String email;

    @Column(nullable = false)
    Boolean isValid = false;

    public User() {
    }

    public User(String userName, String passwordHash, String userType, String companyName, String location, String phone, String email, Boolean isValid) {
        this.userName = userName;
        this.passwordHash = passwordHash;
        this.userType = userType;
        this.companyName = companyName;
        this.location = location;
        this.phone = phone;
        this.email = email;
        this.isValid = isValid;
    }

    public User(String userName, String passwordHash, String userType, String companyName, String location, String phone, String email) {
        this.userName = userName;
        this.passwordHash = passwordHash;
        this.userType = userType;
        this.companyName = companyName;
        this.location = location;
        this.phone = phone;
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getValid() {
        return isValid;
    }

    public void setValid(Boolean valid) {
        isValid = valid;
    }

    public int getId() {
        return id;
    }
}
