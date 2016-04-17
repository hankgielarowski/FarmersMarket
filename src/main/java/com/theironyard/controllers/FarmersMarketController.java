package com.theironyard.controllers;

import com.theironyard.entities.Category;
import com.theironyard.entities.Inventory;
import com.theironyard.entities.Order;
import com.theironyard.entities.User;
import com.theironyard.services.*;
import com.theironyard.utilities.PasswordStorage;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;


/**
 * Created by drewmunnerlyn on 4/6/16.
 */

@RestController
public class FarmersMarketController {

    @Autowired
    UserRepository users;

    @Autowired
    InventoryRepository inventories;

    @Autowired
    CategoryRepository categories;

    @Autowired
    OrderRepository orders;

    Server dbui = null;

    @PostConstruct
    public void init() throws SQLException, FileNotFoundException {
        dbui = Server.createWebServer().start();
    }

    @PreDestroy
    public void destroy() {
        dbui.stop();
    }

    @PostConstruct
    public void constructAdminAndTestUsers() throws PasswordStorage.CannotPerformOperationException {
        if (users.findByUserName("Admin") == null) {
            User user = new User("Admin", PasswordStorage.createHash("admin"),"Admin","FarmersMarket", "Here", "888-888-8888", "FarmersMarket@FarmersMarket.com", true);
            users.save(user);
            User user2 = new User("HankFarmer", PasswordStorage.createHash("hank"), "Farmer", "Hank Farms", "Charleston", "999-999-9999", "Hank@Hank.com", true);
            users.save(user2);
            User user3 = new User("FrankBuyer", PasswordStorage.createHash("frank"), "Buyer", "Frank's Store", "Charleston", "777-989-9998", "Frank@Frank.com", true);
            users.save(user3);
        }
    }

    @PostConstruct
    public void constructInventory(){
        Inventory inventory = new Inventory("Corn", "golden sweet", 10, 2.55, users.findByUserName("HankFarmer"));
        inventories.save(inventory);
    }

    @PostConstruct
    public void categoryParse() throws FileNotFoundException {
        if (categories.count() == 0) {
            File f = new File("categoryCSV.csv");
            Scanner fileScanner = new Scanner(new File("categoryCSV.csv"));
            fileScanner.nextLine();
            while (fileScanner.hasNext()) {
                String line = fileScanner.nextLine();
                String[] column = line.split(",");
                Category c = new Category(column[0], column[1]);
                categories.save(c);
            }
        }
    }

    @RequestMapping(path = "/users", method = RequestMethod.POST)
    public User createUser(@RequestBody User user) throws Exception {
        if(!user.getUserType().equals("Buyer") && !user.getUserType().equals("Farmer")) {
            throw new Exception("Invalid user type");
        }
        if (user.getPasswordHash().equals(user.getPasswordValidate())) {
            user.setPasswordHash(PasswordStorage.createHash(user.getPasswordHash()));
            users.save(user);
        }
        else {
            throw new Exception("password does not match");
        }
        return user;
    }

    @RequestMapping(path = "/users/{id}", method = RequestMethod.PUT)
    public void updateUser(@RequestBody User newUser, @PathVariable("id") int id, HttpSession session) {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);
        if(user.getUserType().equals("Admin")) {
            users.save(newUser);
        }
        else if(user.getId() == id) {
            users.save(newUser);
        }
    }

    @RequestMapping(path = "/users/{id}", method = RequestMethod.DELETE)
    public void deleteUserDeniedByAdmin(@PathVariable("id") int id, HttpSession session) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);
        if(!user.getUserType().equals("Admin") || user.getValid()) {
            throw new Exception("Cannot Delete this User");
        }

        users.delete(id);
    }

    //deleteUserHiddenByAdminOrUser

    @RequestMapping(path = "/users", method = RequestMethod.GET)
    public ArrayList<User> getAllUsers(HttpSession session) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);
        if(!user.getUserType().equals("Admin")) {
            throw new Exception("Insufficient Permissions.");
        }
        return (ArrayList<User>) users.findAll();
    }

    @RequestMapping(path = "/users/{id}", method = RequestMethod.GET)
    public User getOneUser(@PathVariable("id") int id, HttpSession session) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);

        if(!user.getUserType().equals("Admin") && (!user.getUserType().equals("Buyer") || !user.getValid() || !users.findOne(id).getUserType().equals("Farmer")) && user.getId() != id){
            throw new Exception("Invalid User Permissions");
        }

        return users.findOne(id);
    }

    @RequestMapping(path = "/users/category/{category}", method = RequestMethod.GET)
    public ArrayList<User> getUsersInCategory(HttpSession session, @PathVariable("category") String category) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);
        if(!user.getUserType().equals("Admin") && (!user.getUserType().equals("Buyer") || !category.equals("Farmer") || !user.getValid()) && (!user.getUserType().equals("Farmer") || !category.equals("Buyer") || !user.getValid())) {
            throw new Exception("Insufficient Permissions");
        }
        return users.findByUserType(category);
    }

    @RequestMapping(path = "/users/validate/{id}", method = RequestMethod.PUT)
    public void validateUser(@PathVariable("id") int id, HttpSession session) {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);
        if(user.getUserType().equals("Admin")) {
            User newUser = users.findOne(id);
            newUser.setValid(true);
            users.save(newUser);
        }
    }

    @RequestMapping(path = "/users/validate", method = RequestMethod.GET)
    public ArrayList<User> getValidatingUsers(HttpSession session) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);
        if(!user.getUserType().equals("Admin")) {
            throw new Exception("Insufficient Permissions");
        }
        ArrayList<User> validatingUsers = users.findByIsValid(false);
        return validatingUsers;
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public User login(HttpSession session, @RequestBody User user) throws Exception {
        User user2 = users.findByUserName(user.getUserName());
        if (!PasswordStorage.verifyPassword(user.getPasswordHash(), user2.getPasswordHash())) {
            throw new Exception("Wrong Password");
        }
        session.setAttribute("userName", user.getUserName());
        return user2;
    }

    @RequestMapping(path = "/logout", method = RequestMethod.POST)
    public void logout(HttpSession session) throws IOException {
        session.invalidate();
    }

    @RequestMapping(path = "/inventory", method = RequestMethod.POST)
    public Inventory createInventory(@RequestBody Inventory inventory, HttpSession session) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);

        if (!user.getUserType().equals("Farmer") || !user.getValid()){
            throw new Exception("Invalid User Permissions");
        }

        inventory.setUser(user);
        inventories.save(inventory);
        return inventory;
    }

    @RequestMapping(path = "/inventory/user/{id}", method = RequestMethod.POST)
    public Inventory createInventoryByAdmin(@RequestBody Inventory inventory, HttpSession session, @PathVariable("id") int id) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);

        if (!user.getUserType().equals("Admin")){
            throw new Exception("Insufficient User Permissions");
        }
        User user2 = users.findOne(id);

        if(!user2.getValid()) {
            throw new Exception("You cannot add inventory to an unvalidated user");
        }

        inventory.setUser(user2);
        inventories.save(inventory);
        return inventory;
    }

    //not going to use "/inventory" GET all?
    @RequestMapping(path = "/inventory", method = RequestMethod.GET)
    public List<Inventory> getAllInventory() {
        return (List<Inventory>) inventories.findAll();
    }


    @RequestMapping(path = "/inventory/user/{id}", method = RequestMethod.GET)
    public ArrayList<Inventory> getAllInventoryByUser(HttpSession session, @PathVariable("id") int id) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);

        User user2 = users.findOne(id);

        if(!user.getUserType().equals("Admin") && (!user.getUserType().equals("Buyer") || !user.getValid()) && (user.getId() != user2.getId() || !user.getUserType().equals("Farmer"))){
            throw new Exception("Invalid User Permissions");
        }

            return inventories.findByUser(user2);
    }

    @RequestMapping(path = "/inventory/category/{category}", method = RequestMethod.GET)
    public ArrayList<Inventory> getAllInventoryByCategory(@PathVariable("category") String category, HttpSession session) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);

        if(!user.getUserType().equals("Admin") && (!user.getUserType().equals("Buyer") || !user.getValid())) {
            throw new Exception("Invalid User Permissions");
        }

        return (ArrayList<Inventory>) inventories.findByCategory(category);
    }

    //is get one needed??
    @RequestMapping(path = "/inventory/{id}", method = RequestMethod.GET)
    public Inventory getOneInventory(@PathVariable("id") int id) {
        return inventories.findOne(id);
    }

    @RequestMapping(path = "/inventory/{id}", method = RequestMethod.DELETE)
    public void deleteInventory(HttpSession session, @PathVariable("id") int id) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);

        if(!user.getUserType().equals("Admin") && (!user.getUserType().equals("Farmer") || user.getId() != inventories.findOne(id).getUser().getId())){
            throw new Exception("Invalid User Request");
        }

        List<Order> deleteOrderList = orders.findByIsPendingApprovalAndInventory(true, inventories.findOne(id));

        for(Order order : deleteOrderList) {
            orders.delete(order);
        }

        inventories.delete(id);
    }

    @RequestMapping(path = "/inventory/{id}", method = RequestMethod.PUT)
    public void updateInventory(@RequestBody Inventory inventory, @PathVariable("id") int id, HttpSession session) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);

        if(!user.getUserType().equals("Admin") && (!user.getUserType().equals("Farmer") || user.getId() != inventories.findOne(id).getUser().getId())){
            throw new Exception("Invalid User Request");
        }


        inventories.save(inventory);
    }

    @RequestMapping(path = "/categories", method = RequestMethod.GET)
    public ArrayList<Category> getAllCategories(HttpSession session) {
        return (ArrayList<Category>) categories.findAll();
    }

    @RequestMapping(path = "/categories/{letter}", method = RequestMethod.GET)
    public ArrayList<Category> getCategoriesByLetter(HttpSession session, @PathVariable("letter") String letter) {
        return categories.findByCategoryNameStartingWith(letter);
    }

    @RequestMapping(path = "/orders/{pending}", method = RequestMethod.GET)
    public ArrayList<Order> getOrdersPending(HttpSession session, @PathVariable("pending") boolean pending) {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);


        ArrayList<Order> orderList = new ArrayList<Order>();
        if(user.getUserType().equals("Farmer")) {
            orderList = orders.findByIsPendingApprovalAndFarmer(pending, user);
        }
        else if (user.getUserType().equals("Buyer")) {
            orderList = orders.findByIsPendingApprovalAndBuyer(pending, user);
        }
        return orderList;
    }

    @RequestMapping(path = "/orders", method = RequestMethod.POST)
    public void createOrder(HttpSession session, @RequestBody Order order) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);

        if((!user.getUserType().equals("Buyer") || !user.getValid())){
            throw new Exception("Invalid User Permissions");
        }

        order.setBuyer(user);
        order.setFarmer(order.getInventory().getUser());
        order.setTimeStampOrdered(LocalDateTime.now());
        orders.save(order);
    }

    @RequestMapping(path = "/orders/admin/{buyerId}" , method = RequestMethod.POST)
    public void createOrderAdmin(HttpSession session, @RequestBody Order order, @PathVariable("buyerId") int id) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);

        if(!user.getUserType().equals("Admin")) {
            throw new Exception("Insufficient Permissions");
        }

        order.setFarmer(order.getInventory().getUser());
        order.setBuyer(users.findOne(id));
        order.setTimeStampOrdered(LocalDateTime.now());
        orders.save(order);
    }

    @RequestMapping(path = "/orders/{id}", method = RequestMethod.DELETE)
    public void deleteOrder(HttpSession session, @PathVariable("id") int id) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);

        Order order = orders.findOne(id);

        if(!user.getUserType().equals("Admin") && user.getId() != order.getFarmer().getId() && user.getId() != order.getBuyer().getId()) {
            throw new Exception("Invalid User Permissions");
        }

        if(!orders.findOne(id).isPendingApproval()) {
            throw new Exception("Invalid Request: Order is already approved");
        }

        orders.delete(id);
    }

    @RequestMapping(path = "/orders/{userId}", method = RequestMethod.GET)
    public ArrayList<Order> getUserOrders(HttpSession session, @PathVariable("userId") int id) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);

        if(!user.getUserType().equals("Admin")){
            throw new Exception("Insufficient Permissions");
        }
        User checkedUser = users.findOne(id);

        return orders.findByFarmerOrBuyer(checkedUser, checkedUser);
    }

    @RequestMapping(path = "/orders/authorize/{id}", method = RequestMethod.PUT)
    public void authorizeOrder(HttpSession session, @PathVariable("id") int id) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName("userName");

        if (user.getId() != orders.findOne(id).getFarmer().getId() && !user.getUserType().equals("Admin")){
            throw new Exception("Invalid User Permissions");
        }

        Order order = orders.findOne(id);
        Inventory inventory = order.getInventory();

        if(inventory.getQuantityAvailable() < order.getQuantityOrdered()) {
            throw new Exception("Invalid Order: Quantity Requested too High");
        }

        inventory.setQuantityAvailable(inventory.getQuantityAvailable() - order.getQuantityOrdered());

        order.setPendingApproval(false);
        order.setTimeStampOrdered(LocalDateTime.now());

//        if(inventory.getQuantityAvailable() == 0) {
//            List<Order> deleteOrderList = orders.findByIsPendingApprovalAndInventory(true, inventories.findOne(id));
//
//            for(Order order2 : deleteOrderList) {
//                orders.delete(order2);
//            }
//
//            inventories.delete(inventory);
//        }
//        else {
//            inventories.save(inventory);
//        }

        inventories.save(inventory);

        orders.save(order);

    }


    // frontend will handle the buyers' order validation by just not sending the validated (GET route) to backend until the buyer clicks "confirm"
    // need to explain to frontend that they should display a purchse button next to each item
    // when deleting a user or inventory object, need to figure out the parenthood/cascading

}
