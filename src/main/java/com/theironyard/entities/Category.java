package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by drewmunnerlyn on 4/12/16.
 */
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    String categoryName;

    @Column(nullable = false)
    String imageCategory;

    public Category(String categoryName, String imageCategory) {
        this.categoryName = categoryName;
        this.imageCategory = imageCategory;
    }

    public Category() {
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getImageCategory() {
        return imageCategory;
    }

    public void setImageCategory(String imageCategory) {
        this.imageCategory = imageCategory;
    }
}
