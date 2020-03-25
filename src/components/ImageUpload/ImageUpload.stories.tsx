import React, { useState } from 'reactn';
import ImageUpload from './ImageUpload';
import { storiesOf } from '@storybook/react';
import nameof from 'ts-nameof.macro';

export const title: string = 'InputTag';

function Default() {
  return (
    <ImageUpload
        />
  );
}

storiesOf('UploadImage', module)
  .add(nameof(Default), Default);
