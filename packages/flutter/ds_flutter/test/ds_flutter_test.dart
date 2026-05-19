import 'package:flutter_test/flutter_test.dart';

import 'package:ds_flutter/ds_flutter.dart';

void main() {
  test('DSColors has surface tokens', () {
    expect(DSColors.surfaceL0.value, isNonZero);
  });
}
