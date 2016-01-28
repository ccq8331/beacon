/**
 * wesoft.com Inc.
 * Copyright (c) 2005-2016 All Rights Reserved.
 */
package com.wesoft.beacon;

/**
 * beacon程序唯一入口
 * @author <a href="mailto:chencq@hzwesoft.com">chencq</a>
 * @version $Id: Boot.java, v 0.1 2016/1/21 23:20 $
 */

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Boot {

    public static void main(String[] args) {
        SpringApplication.run(Boot.class, args);
    }
}
