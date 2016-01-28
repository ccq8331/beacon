/**
 * wesoft.com Inc.
 * Copyright (c) 2005-2016 All Rights Reserved.
 */
package com.wesoft.beacon.web.mvc;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author <a href="mailto:chencq@hzwesoft.com">chencq</a>
 * @version $Id: ThemeController.java, v 0.1 2016/1/27 17:02 $
 */
@RestController
@RequestMapping("/theme")
public class ThemeController {

    @RequestMapping
    public ModelAndView init() {
        return new ModelAndView("theme");
    }

}
