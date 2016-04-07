package com.theironyard;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.theironyard.entities.User;
import com.theironyard.services.UserRepository;
import com.theironyard.utilities.PasswordStorage;
import org.junit.Assert;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = FarmersMarketApplication.class)
@WebAppConfiguration
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class FarmersMarketApplicationTests {

    @Autowired
    UserRepository users;

    @Autowired
    WebApplicationContext wap;

    MockMvc mockMvc;

    @Before
    public void before() {
		users.deleteAll();
        mockMvc = MockMvcBuilders.webAppContextSetup(wap).build();
    }

    @Test
    public void test1AddUser() throws Exception {
        User user = new User("Alice", "password", "Farmer", "Limehouse Produce", "charleston", "8888", "alice@alice", "password");

        System.out.println();

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(user);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/users")
                        .content(json)
                        .contentType("application/json")
        );

        Assert.assertTrue(users.count() == 1); //should this be one or two since the admin is hardcoded?
        //should we be passing the temp variables too? such as validatePassword and userTypeBool?
    }















//    @Test
//    public void test2DeleteUser() throws Exception {
////        test1AddUser();
//        mockMvc.perform(
//                MockMvcRequestBuilders.delete("/user/1")
//        );
//        Assert.assertTrue(users.count() == 0);
//    }
//
//    @Test
//    public void test3Login() throws Exception {
//        User user = new User();
//        user.setUserName("Alice");
//        user.setPasswordHash("password");
//        ObjectMapper mapper = new ObjectMapper();
//        String json = mapper.writeValueAsString(user);
//        mockMvc.perform(
//                MockMvcRequestBuilders.post("/user")
//                        .content(json)
//                        .contentType("application/json")
//        );
//        Assert.assertTrue(users.count() == 1);
//    }
//

}
