package com.qihang.fragmentapp;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;


public abstract class LazyloadFragment extends Fragment {

    protected View rootView;
    private boolean isInitView = false;
    private boolean isVisible = false;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        rootView = inflater.inflate(setContentView(), container, false);
        init();
        isInitView = true;
        isCanLoadData();
        return rootView;
    }

    @Override
    public void onResume() {
        super.onResume();

        if (!isVisible) {
            isVisible = true;
            isCanLoadData();
        }
    }

    private void isCanLoadData(){
        //所以条件是view初始化完成并且对用户可见
        if(isInitView && isVisible ){
            lazyLoad();
            //防止重复加载数据
            isInitView = false;
            isVisible = false;
        }
    }

    /**
     * 加载页面布局文件
     * @return
     */
    protected abstract int setContentView();

    /**
     * 让布局中的view与fragment中的变量建立起映射
     */
    protected abstract void init();

    /**
     * 加载要显示的数据
     */
    protected abstract void lazyLoad();
}
